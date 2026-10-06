import os
import time
import numpy as np
import cv2
from PIL import Image

CUTOUT_PATH = 'C:/Users/91766/.gemini/antigravity-ide/brain/bfd88e5d-8f22-4031-bde2-45d1bf2a8f85/scratch/cutout.png'
TARGET_JPG = 'src/assets/profile.jpg'
PUBLIC_JPG = 'public/profile.jpg'

def wait_for_cutout(timeout=120):
    start = time.time()
    while time.time() - start < timeout:
        if os.path.exists(CUTOUT_PATH) and os.path.getsize(CUTOUT_PATH) > 10000:
            # wait another half second to ensure file write is flushed
            time.sleep(0.5)
            return True
        time.sleep(2)
    return False

def generate_reference_bg(h, w):
    """
    Generates the exact studio navy blue background matching reference image:
    - Base: Deep navy blue (RGB: [6, 22, 48])
    - Soft radial highlight behind head (center: x=512, y=340, RGB: [16, 42, 85])
    - Corners/edges: Dark midnight navy (RGB: [3, 14, 32])
    """
    Y, X = np.meshgrid(np.arange(h, dtype=np.float32), np.arange(w, dtype=np.float32), indexing='ij')
    
    # Distance from studio light center behind head
    cx, cy = w * 0.50, h * 0.35
    dist = np.sqrt(((X - cx) / 1.1)**2 + ((Y - cy) / 0.9)**2)
    max_d = np.sqrt(cx**2 + cy**2) * 1.3
    norm_dist = np.clip(dist / max_d, 0.0, 1.0)
    
    # Smooth cosine falloff
    glow = 0.5 * (1.0 + np.cos(np.pi * norm_dist)) # 1.0 at center, 0.0 at edge
    
    # Colors in BGR (OpenCV order):
    # Reference center glow: RGB [18, 46, 88] -> BGR [88, 46, 18]
    # Reference mid tone:    RGB [8, 26, 56]  -> BGR [56, 26, 8]
    # Reference edge/corner: RGB [4, 15, 34]  -> BGR [34, 15, 4]
    
    b_chan = 34.0 + 24.0 * glow + 32.0 * (glow**2)
    g_chan = 14.0 + 13.0 * glow + 20.0 * (glow**2)
    r_chan = 4.0 + 5.0 * glow + 10.0 * (glow**2)
    
    bg = np.dstack([b_chan, g_chan, r_chan])
    
    # Add subtle organic studio grain to prevent banding
    np.random.seed(42)
    grain = np.random.normal(0, 1.2, (h, w, 3))
    bg = np.clip(bg + grain, 0, 255).astype(np.uint8)
    return bg

def main():
    print("Checking for cutout file...")
    if not wait_for_cutout(timeout=60):
        print("Cutout not ready or timed out.")
        return False
        
    print("Loading cutout from:", CUTOUT_PATH)
    cutout = Image.open(CUTOUT_PATH).convert('RGBA')
    cutout_np = np.array(cutout)
    
    h, w, _ = cutout_np.shape
    print(f"Cutout dimensions: {w}x{h}")
    
    # Separate RGB and Alpha
    fg_rgb = cutout_np[:, :, :3]
    alpha = cutout_np[:, :, 3].astype(np.float32) / 255.0
    
    # Refine alpha slightly for ultra-clean edges
    # Defringe: any edge pixel with partial alpha that picked up gray studio tint
    alpha_3d = np.dstack([alpha, alpha, alpha])
    
    # Generate background in RGB
    bg_bgr = generate_reference_bg(h, w)
    bg_rgb = cv2.cvtColor(bg_bgr, cv2.COLOR_BGR2RGB).astype(np.float32)
    
    # Composite: output = fg * alpha + bg * (1 - alpha)
    composite_rgb = (fg_rgb.astype(np.float32) * alpha_3d + bg_rgb * (1.0 - alpha_3d))
    composite_rgb = np.clip(composite_rgb, 0, 255).astype(np.uint8)
    
    # Convert to BGR for OpenCV saving
    composite_bgr = cv2.cvtColor(composite_rgb, cv2.COLOR_RGB2BGR)
    
    # Save high quality JPEG and PNG
    os.makedirs(os.path.dirname(TARGET_JPG), exist_ok=True)
    os.makedirs(os.path.dirname(PUBLIC_JPG), exist_ok=True)
    
    cv2.imwrite(TARGET_JPG, composite_bgr, [cv2.IMWRITE_JPEG_QUALITY, 98])
    cv2.imwrite(PUBLIC_JPG, composite_bgr, [cv2.IMWRITE_JPEG_QUALITY, 98])
    
    print("Successfully saved updated profile image to:")
    print(f" - {TARGET_JPG}")
    print(f" - {PUBLIC_JPG}")
    return True

if __name__ == '__main__':
    main()

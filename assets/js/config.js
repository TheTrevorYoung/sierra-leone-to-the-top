// One-file connection point for the custom domain, official channels and shared visual layer.
window.SLTT_CONFIG = {
  customDomain: "https://sierraleonetothetop.com",
  contactEmail: "",
  youtube: "https://www.youtube.com/@sierraleonetothetop1961",
  facebook: "https://www.facebook.com/SierraLeoneToTheTop/",
  instagram: "https://www.instagram.com/sierraleonetothetop/",
  tiktok: "",
  linkedin: "",
  x: "https://x.com/SL2TheTop"
};

// Load the shared immersive visual layer on all interior pages without duplicating markup.
if (!document.querySelector('link[href="assets/css/interior-immersive.css"]')) {
  const immersiveStyles = document.createElement('link');
  immersiveStyles.rel = 'stylesheet';
  immersiveStyles.href = 'assets/css/interior-immersive.css';
  document.head.appendChild(immersiveStyles);
}

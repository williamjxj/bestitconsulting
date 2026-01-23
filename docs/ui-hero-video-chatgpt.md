### Hero Section Video Guidelines

#### 🎞️ 1. Common Video Size (Dimensions)

The **hero section** usually spans the full width of the viewport, so dimensions should match the most common screen ratios:

* **Desktop:** `1920 × 1080 px` (Full HD)
* **Tablet:** `1280 × 720 px`
* **Mobile:** `720 × 1280 px`

For responsive design, the video should automatically scale and crop (using CSS like `object-fit: cover`).

#### ⚖️ 2. File Size (Weight)

A hero video should **load fast** — typically:

* **Ideal file size:** 1–5 MB (under 3 MB is best for performance)
* **Duration:** 10–20 seconds loop
* **Bitrate:** 1500–2500 kbps (web-optimized)
* **Compression:** Use [HandBrake](https://handbrake.fr/) or ffmpeg to reduce size without visible quality loss.

#### 🎬 3. Recommended Video Formats

Use a combination of formats for browser compatibility:

| Format            | Purpose                 | Notes                 |
| --- | --- | --- |
| `.mp4` (H.264)    | ✅ Most compatible       | Works on all browsers |
| `.webm`           | ✅ High quality, smaller | Chrome, Firefox, Edge |
| `.ogv` (optional) | Older browsers          | Not commonly used now |

👉 Provide multiple sources in your `<video>` tag for best cross-browser support.

#### 💻 4. HTML Example

```html
<section class="hero">
  <video autoplay muted loop playsinline id="heroVideo">
    <source src="hero-video.mp4" type="video/mp4">
    <source src="hero-video.webm" type="video/webm">
    Your browser does not support the video tag.
  </video>
  <div class="hero-content">
    <h1>Fresh, Delicious, Delivered.</h1>
    <p>Experience authentic flavors in every bite.</p>
    <button>Shop Now</button>
  </div>
</section>
```

#### 🎨 5. CSS Styling

```css
.hero {
  position: relative;
  width: 100%;
  height: 100vh; /* full viewport height */
  overflow: hidden;
}

.hero video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* keeps video covering area */
  z-index: -1;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
```

#### ⚙️ 6. Optimization Tips

* **Add poster image:**

  ```html
  <video poster="hero-poster.jpg" ...>
  ```

  This ensures a quick display before video loads.
* **Lazy load** or defer video for better performance.
* **Use CDN hosting** or optimized static file delivery.
* **Mobile fallback:** Replace video with a static background image on small screens for speed.

#### 📏 Summary

| Aspect     | Recommendation                             |
| --- | --- |
| Dimensions | 1920×1080 px (scalable)                    |
| File Size  | < 3 MB ideal                               |
| Length     | 10–20 seconds loop                         |
| Format     | MP4 + WebM                                 |
| CSS        | `object-fit: cover`, full viewport height  |
| Fallback   | Poster image + static background on mobile |

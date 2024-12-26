# SquanchCoin Text Effect Component

## BlotterText Component Documentation

The `BlotterText` component is a custom React component that creates a liquid-like distortion effect on text using Three.js and WebGL shaders. This component replaces the original Blotter.js implementation with a more performant and stable solution.

### Key Features
- Liquid distortion effect on hover
- Responsive to mouse movement
- Fallback to regular text when WebGL is not available
- Support for headers and regular text
- Automatic text sizing and scaling
- High-performance WebGL rendering

### Usage

```tsx
// For main header (full viewport height)
<BlotterText 
  text="Your Text" 
  isHeader={true} 
  fill="#ffffff" 
/>

// For regular section headers
<BlotterText 
  text="Section Header" 
  fill="#ffffff" 
/>
```

### Props

- `text` (required): The text to display
- `isHeader` (optional): Set to true for full viewport height headers
- `fill` (optional): Text color (supports hex and rgb/rgba)
- `size` (optional): Base font size (default: 100)
- `className` (optional): Additional CSS classes

### ⚠️ IMPORTANT: DO NOT MODIFY

The following parts of the component should NEVER be modified as they are critical for stability:

1. Texture Initialization:
   ```typescript
   texture.minFilter = THREE.LinearFilter;
   texture.magFilter = THREE.LinearFilter;
   texture.format = THREE.RGBAFormat;
   texture.type = THREE.UnsignedByteType;
   ```

2. Canvas Power-of-Two Dimensions:
   ```typescript
   const textureWidth = Math.pow(2, Math.ceil(Math.log2(Math.min(2048, initialWidth))));
   ```

3. WebGL Context Management:
   ```typescript
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
   ```

4. Resource Cleanup in useEffect:
   ```typescript
   return () => {
     // ... cleanup code
     renderer.dispose();
     geometry.dispose();
     material.dispose();
     texture.dispose();
   };
   ```

### Common Issues to Avoid

1. **Memory Leaks**
   - Always ensure the component unmounts properly
   - Never remove the cleanup function in useEffect
   - Don't create new WebGL contexts without disposing of old ones

2. **Performance Issues**
   - Don't increase the texture size beyond 2048px
   - Don't modify the pixel ratio limit
   - Don't remove the animation frame cancellation

3. **Texture Problems**
   - Don't change the texture format from RGBA
   - Don't modify the power-of-two texture dimensions
   - Don't remove the black background for text rendering

4. **Shader Issues**
   - Don't modify the UV clamping in the fragment shader
   - Don't change the alpha channel handling
   - Keep the distortion parameters within safe ranges

### Technical Details

The component uses several techniques to ensure stability:

1. **Texture Management**
   - Uses power-of-two dimensions for WebGL compatibility
   - Properly handles texture disposal
   - Uses linear filtering for smooth rendering

2. **WebGL Context**
   - Handles context loss and restoration
   - Limits pixel ratio for performance
   - Uses proper context attributes for stability

3. **Memory Management**
   - Disposes of all Three.js resources
   - Cleans up event listeners
   - Handles component unmounting

4. **Error Handling**
   - Provides fallback for WebGL errors
   - Handles color parsing errors
   - Manages texture creation failures

### Browser Support

- Requires WebGL support
- Falls back gracefully when WebGL is not available
- Tested on modern browsers (Chrome, Firefox, Safari, Edge)

### Performance Considerations

1. **Texture Size**
   - Maximum texture size: 2048px
   - Minimum texture size: 256px
   - Automatically scales based on container

2. **Animation**
   - Uses requestAnimationFrame for smooth animation
   - Limits distortion calculations to visible area
   - Optimizes shader calculations

3. **Memory**
   - Properly disposes of WebGL resources
   - Manages texture memory efficiently
   - Cleans up event listeners

### Troubleshooting

If you encounter issues:

1. Check WebGL support in the browser
2. Verify container dimensions are non-zero
3. Ensure proper cleanup on unmount
4. Check for memory leaks with React DevTools
5. Verify color format compatibility

Remember: This component is carefully tuned for performance and stability. Any modifications to the core rendering logic may cause instability or memory leaks. 
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(0,0,0)',
  maxOpacity = 0.3,
  style,
}) {
  const canvasRef = useRef(null)
  const [isInView, setIsInView] = useState(false)

  const memoizedColor = useMemo(() => {
    const tmp = document.createElement('canvas')
    tmp.width = tmp.height = 1
    const ctx = tmp.getContext('2d')
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
    return `rgba(${r}, ${g}, ${b},`
  }, [color])

  const drawGrid = useCallback(
    (ctx, bufW, bufH, cols, rows, squares, dpr) => {
      ctx.clearRect(0, 0, bufW, bufH)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.fillStyle = `${memoizedColor}${squares[i * rows + j]})`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId
    let squares
    let cols, rows, dpr

    const resize = () => {
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      if (!w || !h) return
      dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      cols = Math.floor(w / (squareSize + gridGap))
      rows = Math.floor(h / (squareSize + gridGap))
      squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity
    }

    resize()

    let lastTime = 0
    const animate = (time) => {
      if (!squares) return
      const dt = (time - lastTime) / 1000
      lastTime = time
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * dt) squares[i] = Math.random() * maxOpacity
      }
      drawGrid(ctx, canvas.width, canvas.height, cols, rows, squares, dpr)
      animId = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(canvas)

    if (isInView) animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      io.disconnect()
    }
  }, [isInView, squareSize, gridGap, maxOpacity, flickerChance, drawGrid])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}

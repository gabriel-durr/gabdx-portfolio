import Lottie from 'lottie-react'
import aTada from './data/tada.json'

export const Tada = () => {
  return (
    <Lottie
      animationData={aTada}
      loop={false}
      style={{
        position: 'absolute',
        zIndex: -1,
        top: -100,
        left: -80,
        borderRadius: '50%',
        userSelect: 'none',
        pointerEvents: 'none'
      }}
    />
  )
}

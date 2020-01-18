import {useState, useEffect} from 'react'
import {Animated, InteractionManager, Easing} from 'react-native'

const useAnimation = ({
  doAnimation,
  duration,
  delay = 0,
  ease = Easing.ease,
  onAnimationEnd,
  type = 'timing',
}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated[type](animation, {
      toValue: doAnimation ? 1 : 0,
      delay,
      duration,
      ease,
      useNativeDriver: true,
    }).start(onAnimationEnd)
  }, [doAnimation])

  return animation
}

export default useAnimation

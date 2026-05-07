import { defineKeyframes } from '@pandacss/dev'

// Pre-calculated glitch clip values — deterministic for reproducible builds.
// Two distinct sequences give each animation a different visual rhythm.
const GLITCH_FRAMES_1: Array<[string, string]> = [
  ['0%',   'rect(0.42rem, 18.5rem, 2.13rem, 0rem)'],
  ['5%',   'rect(1.87rem, 18.5rem, 0.65rem, 0rem)'],
  ['10%',  'rect(2.54rem, 18.5rem, 1.30rem, 0rem)'],
  ['15%',  'rect(0.09rem, 18.5rem, 3.10rem, 0rem)'],
  ['20%',  'rect(3.22rem, 18.5rem, 0.78rem, 0rem)'],
  ['25%',  'rect(1.44rem, 18.5rem, 2.91rem, 0rem)'],
  ['30%',  'rect(0.71rem, 18.5rem, 1.55rem, 0rem)'],
  ['35%',  'rect(2.38rem, 18.5rem, 0.22rem, 0rem)'],
  ['40%',  'rect(1.03rem, 18.5rem, 3.41rem, 0rem)'],
  ['45%',  'rect(3.49rem, 18.5rem, 0.88rem, 0rem)'],
  ['50%',  'rect(0.55rem, 18.5rem, 2.67rem, 0rem)'],
  ['55%',  'rect(2.11rem, 18.5rem, 1.04rem, 0rem)'],
  ['60%',  'rect(1.29rem, 18.5rem, 3.28rem, 0rem)'],
  ['65%',  'rect(3.07rem, 18.5rem, 0.47rem, 0rem)'],
  ['70%',  'rect(0.83rem, 18.5rem, 2.02rem, 0rem)'],
  ['75%',  'rect(2.75rem, 18.5rem, 1.19rem, 0rem)'],
  ['80%',  'rect(0.34rem, 18.5rem, 3.38rem, 0rem)'],
  ['85%',  'rect(1.62rem, 18.5rem, 0.93rem, 0rem)'],
  ['90%',  'rect(3.15rem, 18.5rem, 0.51rem, 0rem)'],
  ['95%',  'rect(0.97rem, 18.5rem, 2.44rem, 0rem)'],
]

const GLITCH_FRAMES_2: Array<[string, string]> = [
  ['0%',   'rect(2.08rem, 18.5rem, 0.33rem, 0rem)'],
  ['5%',   'rect(0.77rem, 18.5rem, 3.21rem, 0rem)'],
  ['10%',  'rect(3.44rem, 18.5rem, 1.12rem, 0rem)'],
  ['15%',  'rect(1.56rem, 18.5rem, 0.69rem, 0rem)'],
  ['20%',  'rect(0.21rem, 18.5rem, 2.88rem, 0rem)'],
  ['25%',  'rect(2.63rem, 18.5rem, 0.14rem, 0rem)'],
  ['30%',  'rect(1.09rem, 18.5rem, 3.47rem, 0rem)'],
  ['35%',  'rect(3.32rem, 18.5rem, 0.96rem, 0rem)'],
  ['40%',  'rect(0.48rem, 18.5rem, 2.25rem, 0rem)'],
  ['45%',  'rect(2.19rem, 18.5rem, 1.73rem, 0rem)'],
  ['50%',  'rect(1.38rem, 18.5rem, 0.06rem, 0rem)'],
  ['55%',  'rect(3.01rem, 18.5rem, 2.50rem, 0rem)'],
  ['60%',  'rect(0.62rem, 18.5rem, 1.41rem, 0rem)'],
  ['65%',  'rect(2.47rem, 18.5rem, 3.09rem, 0rem)'],
  ['70%',  'rect(1.85rem, 18.5rem, 0.57rem, 0rem)'],
  ['75%',  'rect(0.16rem, 18.5rem, 2.34rem, 0rem)'],
  ['80%',  'rect(3.28rem, 18.5rem, 1.66rem, 0rem)'],
  ['85%',  'rect(1.74rem, 18.5rem, 0.39rem, 0rem)'],
  ['90%',  'rect(0.91rem, 18.5rem, 3.17rem, 0rem)'],
  ['95%',  'rect(2.82rem, 18.5rem, 0.74rem, 0rem)'],
]

function framesToKeyframes(frames: Array<[string, string]>) {
  return frames.reduce<Record<string, { clip: string }>>((acc, [pct, clip]) => {
    acc[pct] = { clip }
    return acc
  }, {})
}

export const keyframes = defineKeyframes({
  glitchAnimation1: framesToKeyframes(GLITCH_FRAMES_1),
  glitchAnimation2: framesToKeyframes(GLITCH_FRAMES_2),
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.4' },
  },
})


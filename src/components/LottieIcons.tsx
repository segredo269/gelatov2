import React, { useRef } from 'react';
import { Lottie } from 'lottie-react';

// Procedural vector Lottie data definitions adhering to LottieFiles motion design principles
// 1. Ice Cream Melting & Bouncing Cone (Anticipation, bounce, secondary swirl)
const iceCreamLottieData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: "ArtisanIceCream",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "IceCreamTop",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [4] },
            { t: 30, s: [4], e: [-4] },
            { t: 60, s: [-4], e: [2] },
            { t: 90, s: [2], e: [0] },
            { t: 120, s: [0] }
          ]
        },
        p: {
          a: 1,
          k: [
            { t: 0, s: [100, 75, 0], e: [100, 71, 0] },
            { t: 30, s: [100, 71, 0], e: [100, 78, 0] },
            { t: 60, s: [100, 78, 0], e: [100, 72, 0] },
            { t: 90, s: [100, 72, 0], e: [100, 75, 0] },
            { t: 120, s: [100, 75, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100], e: [104, 96, 100] },
            { t: 30, s: [104, 96, 100], e: [97, 103, 100] },
            { t: 60, s: [97, 103, 100], e: [100, 100, 100] },
            { t: 120, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, -10] },
              s: { a: 0, k: [66, 66] }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.93, 0.28, 0.44, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        },
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 12] },
              s: { a: 0, k: [76, 44] }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.98, 0.45, 0.58, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "ConeBase",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 140, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-34, -30], [34, -30], [0, 48]],
                  c: true
                }
              }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.89, 0.62, 0.32, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "st",
              c: { a: 0, k: [0.76, 0.48, 0.22, 1] },
              w: { a: 0, k: 2.5 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

// 2. Snowflake / Cold Chain Lottie
const snowflakeLottieData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 120,
  h: 120,
  nm: "ColdFreezerSnowflake",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Rotator",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 120, s: [360] }
          ]
        },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [92, 92, 100], e: [106, 106, 100] },
            { t: 60, s: [106, 106, 100], e: [92, 92, 100] },
            { t: 120, s: [92, 92, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [6, 72] },
              r: { a: 0, k: 3 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.14, 0.65, 0.95, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        },
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [6, 72] },
              r: { a: 0, k: 3 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.14, 0.65, 0.95, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 60 },
              o: { a: 0, k: 100 }
            }
          ]
        },
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [6, 72] },
              r: { a: 0, k: 3 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.14, 0.65, 0.95, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 120 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

// 3. Delivery Express Lottie
const deliveryLottieData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 160,
  h: 120,
  nm: "DeliveryExpress",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "TruckBody",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [80, 58, 0], e: [80, 56, 0] },
            { t: 30, s: [80, 56, 0], e: [80, 59, 0] },
            { t: 60, s: [80, 59, 0], e: [80, 56, 0] },
            { t: 90, s: [80, 56, 0], e: [80, 58, 0] },
            { t: 120, s: [80, 58, 0] }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              p: { a: 0, k: [-15, 0] },
              s: { a: 0, k: [65, 42] },
              r: { a: 0, k: 6 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.94, 0.42, 0.15, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        },
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              p: { a: 0, k: [30, 6] },
              s: { a: 0, k: [28, 30] },
              r: { a: 0, k: 4 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.85, 0.35, 0.12, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "WheelLeft",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 60, s: [360], e: [720] },
            { t: 120, s: [720] }
          ]
        },
        p: { a: 0, k: [55, 84, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [22, 22] }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.2, 0.2, 0.22, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "WheelRight",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 60, s: [360], e: [720] },
            { t: 120, s: [720] }
          ]
        },
        p: { a: 0, k: [108, 84, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [22, 22] }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.2, 0.2, 0.22, 1] },
              o: { a: 0, k: 100 }
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ]
    }
  ]
};

export function LottieIceCream({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Lottie
        src={iceCreamLottieData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export function LottieSnowflake({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Lottie
        src={snowflakeLottieData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export function LottieDelivery({ className = "w-16 h-12" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Lottie
        src={deliveryLottieData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

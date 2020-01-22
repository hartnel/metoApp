
import {
  trigger,
  state,
  style,
animateChild,
  query,
  group,
  animate,
  transition,
  // ...
} from '@angular/animations'
export const weatherSlideInAnimation =trigger('routeAnimations', [
  transition('WeatherCard => *', [
       query(':enter, :leave',
            style({ position: 'fixed', width: '100%' }),
            { optional: true }),
       group([
            query(':enter',[
                style({ transform: 'translateX(-100%)' }),
                animate('0.5s ease-in-out',
                style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform:   'translateX(0%)'}),
                animate('0.5s ease-in-out',
                style({ transform: 'translateX(100%)' }))
            ], { optional: true }),
       ])
  ]),
      ]);


      export const fadeAnimation =
      trigger('simpleFadeAnimation', [


        state('in', style({ opacity: 1 })),


        transition(':enter', [
          style({ opacity: 0 }),

          animate(2500)
        ]),


        transition(':leave',
          animate(1500, style({ opacity: 0 })))
      ]);

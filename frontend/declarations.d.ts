declare module '@heroicons/react' {
    import * as React from 'react';
  
    export interface HeroIconProps extends React.SVGProps<SVGSVGElement> {}
  
    export const PlusIcon: React.FC<HeroIconProps>;
    export const MinusIcon: React.FC<HeroIconProps>;
    // Add other icons you use here
  }
  
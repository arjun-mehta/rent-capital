import { AnimationChild, AnimationParent } from "./animations";
import { Calculator } from "./calculator";

export function Estimate() {
  return (
    <AnimationParent className="w-full max-w-container px-4 mx-auto pt-20 relative">
      <a id="calculate" className="absolute top-0 left-0" />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full">
          <AnimationChild className="flex items-center size-full">
            <h2 className="font-thunder text-7xl leading-none uppercase">
              Calculate your estimated funding
            </h2>
          </AnimationChild>
        </div>

        {/* <Carousel orientation="vertical" className="w-full">
          <CarouselContent>
            <CarouselItem>
              <h2 className="text-2xl font-bold">
                Calculate your estimated funding
              </h2>
            </CarouselItem>
            <CarouselItem>
              <h2 className="text-2xl font-bold">
                Calculate your estimated funding
              </h2>
            </CarouselItem>
          </CarouselContent>
        </Carousel> */}

        <Calculator />
      </div>
    </AnimationParent>
  );
}

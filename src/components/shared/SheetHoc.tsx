import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type Props = Readonly<{
  children: React.ReactNode;
  trigger: React.ReactNode;
}>;

export function SheetHoc({ children, trigger }: Props) {
  return (
    <>
      <Sheet>
        <SheetTrigger className="hidden md:block" asChild>
          {trigger}
        </SheetTrigger>
        <SheetContent className="min-w-xl">{children}</SheetContent>
      </Sheet>
      <Drawer>
        <DrawerTrigger className="md:hidden" asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent className="h-[95%] ">{children}</DrawerContent>
      </Drawer>
    </>
  );
}

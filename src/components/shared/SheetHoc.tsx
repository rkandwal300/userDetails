import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type Props = Readonly<{
  children: React.ReactNode;
  trigger: string;
}>;

export function SheetHoc({ children, trigger }: Props) {
  return (
    <>
      <Sheet>
        <SheetTrigger className="hidden md:block" asChild>
          {trigger}
        </SheetTrigger>
        <SheetContent>{children}</SheetContent>
      </Sheet>
      <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  );
}

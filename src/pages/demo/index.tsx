import { Navbar } from '@/components';

export default function DemoPage(props) {
  return (
    <>
      <Navbar title="demo" />
      {props.children}
    </>
  );
}

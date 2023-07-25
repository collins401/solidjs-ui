import { createSignal } from 'solid-js';
import { ImageView } from './index';
export default function imageViewDemo() {
  const [files, setFiles] = createSignal([
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60',
    'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80'
  ]);
  return (
    <div>
      imageView
      <ImageView imgs={files()} />
    </div>
  );
}

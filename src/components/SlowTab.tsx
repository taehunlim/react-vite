import { memo } from 'react';

const SlowTab = memo(function SlowTab() {
   // Log once. The actual slowdown is inside SlowPost.
   console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

   let items = [];
   for (let i = 0; i < 500; i++) {
      items.push(<SlowPost key={i} index={i} />);
   }
   return <ul className="items">{items}</ul>;
});

function SlowPost({ index }: { index: number }) {
   let startTime = performance.now();
   while (performance.now() - startTime < 1) {}

   return <li className="item">Post #{index + 1}</li>;
}

export default SlowTab;

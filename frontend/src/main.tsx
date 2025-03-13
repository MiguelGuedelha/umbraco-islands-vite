import './index.css';

import React, { JSX, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const BlogListing = React.lazy(() => import('@/components/BlogListing'));

const componentsMap: Record<string, React.LazyExoticComponent<(props: any) => JSX.Element>> = {
  BlogListing
};

async function tryRenderComponent(element: Element) {
  const componentName = element.getAttribute('data-component');
  if (!componentName) {
    console.error('Attribute "data-component" is missing or null.');
    return;
  }

  const Component = componentsMap[componentName];
  if (!Component) {
    console.error(`Component "${componentName}" not found in componentsMap.`);
    return;
  }

  const contentData = element.getAttribute('data-content');
  const content = contentData ? JSON.parse(contentData) : {};

  const root = createRoot(element);
  root.render(
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...content} />
    </Suspense>
  );
}

document.addEventListener('DOMContentLoaded', async () => {
  const start = performance.now();
  // Select all elements that should host a React component
  const elements = Array.from(document.querySelectorAll('.react-component'));

  // Run rendering tasks in parallel
  await Promise.allSettled(
    elements.map(async (element) => {
      await tryRenderComponent(element);
    })
  );
  const end = performance.now();

  console.log(`React islands rendering took ${end - start} milliseconds`);
});

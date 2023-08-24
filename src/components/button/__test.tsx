import { describe, expect, test } from 'vitest';
import { fireEvent, render } from 'solid-testing-library';
import { Button } from './button';

describe('<Button />', () => {
  test('renders', () => {
    const { container, unmount } = render(() => <Button type="primary">测试Button</Button>);
    expect(container.innerHTML).toMatchInlineSnapshot(
      '"<button class=\\"so-button bg-primary text-white border-primary text-14px h-8 px-3 rounded\\">测试Button</button>"'
    );
    unmount();
  });

  test('updates', async () => {
    const { container, unmount, queryByText } = render(() => <Button>测试Button</Button>);
    const button = queryByText('测试Button');
    const buttonClicked = new Promise((resolve) => {
      const handler = (ev) => {
        button.removeEventListener('click', handler);
        resolve(ev);
      };
      button.addEventListener('click', handler);
    });
    fireEvent.click(button);
    await buttonClicked;
    expect(container.innerHTML).toMatchInlineSnapshot(
      '"<button class=\\"so-button border border-button text-14px h-8 px-3 rounded\\">测试Button</button>"'
    );
    unmount();
  });
});

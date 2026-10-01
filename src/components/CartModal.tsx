import { forwardRef, useImperativeHandle, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import Cart from './Cart';

export type CartModalHandle = {
  open: () => void;
};

type CartModalProps = {
  title: string;
  actions: ReactNode;
};

const CartModal = forwardRef<CartModalHandle, CartModalProps>(function Modal(
  { title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current?.showModal();
    },
  }));

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal') as HTMLElement
  );
});

export default CartModal;
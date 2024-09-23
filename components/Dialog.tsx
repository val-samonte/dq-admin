import { Fragment, Suspense } from 'react'
import {
  Dialog as UiDialog,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Spinner } from './Spinner'
import cn from 'classnames'

export interface DialogProps {
  show: boolean
  children: React.ReactNode
  onClose?: () => void
}

export default function Dialog({ show, children, onClose }: DialogProps) {
  return (
    <Transition show={show} as={Fragment}>
      <UiDialog onClose={onClose ?? (() => {})} className='relative z-50'>
        <TransitionChild
          as={Fragment}
          enter='ease-linear duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-linear duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={'fixed h-dvh inset-x-0 top-0 overflow-hidden'}
            aria-hidden='true'
          >
            <button
              onClick={onClose}
              className={cn(
                'cursor-default',
                'backdrop-grayscale backdrop-opacity-80 bg-black/90 w-full h-full'
              )}
            />
          </div>
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300 delay-100'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0 pointer-events-none'>
            <div className='h-full flex flex-col flex-auto items-center justify-center overflow-hidden'>
              <div className='w-full mx-auto overflow-hidden'>
                <div
                  className={
                    'w-full h-full flex flex-col items-center justify-center'
                  }
                >
                  <Suspense fallback={<Spinner />}>
                    <div className='pointer-events-auto w-full'>{children}</div>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </UiDialog>
    </Transition>
  )
}

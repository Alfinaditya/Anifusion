'use client';

import * as Popover from '@radix-ui/react-popover';
import React, { useState } from 'react';
import { AdjustmentsIcon, XIcon } from '@/icons';
import { twMerge } from 'tailwind-merge';
import * as Label from '@radix-ui/react-label';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useRouter } from 'next/navigation';
import animeStore from './mangaStore';
import { orderBy as orderByData, sorts, statuses, types } from './sortUtils';

const SortOptions = () => {
  const { setPage, setSearch } = animeStore();
  const router = useRouter();
  const [type, setType] = useState(types[0].value);
  const [status, setStatus] = useState(statuses[0].value);
  const [orderBy, setOrderBy] = useState(orderByData[0].value);
  const [sort, setSort] = useState(sorts[0].value);

  function handleSort() {
    setSearch('');
    router.push(
      `/manga?status=${status}&type=${type}&order-by=${orderBy}&sort=${sort}`
    );
    setPage(1);
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={twMerge(
            'rounded-full',
            'w-[35px] h-[35px]',
            'inline-flex items-center justify-center',
            'text-slate-950 bg-white',
            'shadow-[0_2px_10px] shadow-lg',
            'hover:bg-violet3',
            'focus:shadow-[0_0_0_2px] focus:shadow-black',
            'cursor-pointer',
            'outline-none'
          )}
          aria-label="Update dimensions"
        >
          {/* <MixerHorizontalIcon /> */}
          <AdjustmentsIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={twMerge(
            'rounded',
            'p-5 max-w-max',
            'bg-white',
            'w-screen',
            'shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]',
            'focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]',
            'will-change-[transform,opacity]',
            'data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade',
            'z-20'
          )}
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5 flex-wrap ">
            <div className="mb-3">
              <p
                className={twMerge(
                  'text-[15px] leading-[19px] font-medium',
                  'mb-2.5'
                )}
              >
                Type
              </p>
              <RadioGroup.Root
                className="flex gap-5 flex-wrap w-full"
                defaultValue={type}
                aria-label="View type"
                onValueChange={(value) => {
                  setType(value);
                }}
              >
                {types.map((type, i) => (
                  <div className="flex items-center " key={crypto.randomUUID()}>
                    <RadioGroup.Item
                      className={twMerge(
                        'bg-white',
                        'w-6 h-6',
                        'border-solid border-1 rounded-full border-light-pink',
                        'focus:shadow-black',
                        'outline-none',
                        'cursor-default',
                        'shadow-slate-300'
                      )}
                      value={type.value}
                      id={`types-${i}`}
                    >
                      <RadioGroup.Indicator
                        className={twMerge(
                          'flex items-center justify-center',
                          'w-full h-full',
                          'relative',
                          'after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-main'
                        )}
                      />
                    </RadioGroup.Item>
                    <Label.Root
                      className={twMerge('font-medium', 'pl-3')}
                      htmlFor={`types-${i}`}
                    >
                      {type.label}
                    </Label.Root>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
            <div className="mb-3 ">
              <p
                className={twMerge(
                  'text-[15px] leading-[19px] font-medium',
                  'mb-2.5'
                )}
              >
                Status
              </p>

              <RadioGroup.Root
                className="flex gap-5 flex-wrap w-full"
                defaultValue={status}
                aria-label="View status"
                onValueChange={(value) => setStatus(value)}
              >
                {statuses.map((status, i) => (
                  <div className="flex items-center" key={crypto.randomUUID()}>
                    <RadioGroup.Item
                      className={twMerge(
                        'bg-white',
                        'w-6 h-6',
                        'border-solid border-1 rounded-full border-light-pink',
                        'focus:shadow-black',
                        'outline-none',
                        'cursor-default',
                        'shadow-slate-300'
                      )}
                      value={status.value}
                      id={`statuses-${i}`}
                    >
                      <RadioGroup.Indicator
                        className={twMerge(
                          'flex items-center justify-center',
                          'w-full h-full',
                          'relative',
                          'after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-main'
                        )}
                      />
                    </RadioGroup.Item>
                    <Label.Root
                      className={twMerge('font-medium', 'pl-3')}
                      htmlFor={`statuses-${i}`}
                    >
                      {status.label}
                    </Label.Root>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
            <div className="mb-3">
              <p
                className={twMerge(
                  'text-[15px] leading-[19px] font-medium',
                  'mb-2.5'
                )}
              >
                Order By
              </p>
              <RadioGroup.Root
                className="flex gap-5 flex-wrap w-full"
                defaultValue={orderBy}
                aria-label="View Order By"
                onValueChange={(value) => setOrderBy(value)}
              >
                {orderByData.map((by, i) => (
                  <div className="flex items-center" key={crypto.randomUUID()}>
                    <RadioGroup.Item
                      className={twMerge(
                        'bg-white',
                        'w-6 h-6',
                        'border-solid border-1 rounded-full border-light-pink',
                        'focus:shadow-black',
                        'outline-none',
                        'cursor-default',
                        'shadow-slate-300'
                      )}
                      value={by.value}
                      id={`order-by-${i}`}
                    >
                      <RadioGroup.Indicator
                        className={twMerge(
                          'flex items-center justify-center',
                          'w-full h-full',
                          'relative',
                          'after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-main'
                        )}
                      />
                    </RadioGroup.Item>
                    <Label.Root
                      className={twMerge('font-medium', 'pl-3')}
                      htmlFor={`order-by-${i}`}
                    >
                      {by.label}
                    </Label.Root>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
            <div className="mb-3">
              <p
                className={twMerge(
                  'text-[15px] leading-[19px] font-medium',
                  'mb-2.5'
                )}
              >
                Sort
              </p>
              <RadioGroup.Root
                className="flex gap-5 flex-wrap w-full"
                defaultValue={sort}
                aria-label="View Sort"
                onValueChange={(value) => setSort(value)}
              >
                {sorts.map((sort, i) => (
                  <div className="flex items-center" key={crypto.randomUUID()}>
                    <RadioGroup.Item
                      className={twMerge(
                        'bg-white',
                        'w-6 h-6',
                        'border-solid border-1 rounded-full border-light-pink',
                        'focus:shadow-black',
                        'outline-none',
                        'cursor-default',
                        'shadow-slate-300'
                      )}
                      value={sort.value}
                      id={`sort-${i}`}
                    >
                      <RadioGroup.Indicator
                        className={twMerge(
                          'flex items-center justify-center',
                          'w-full h-full',
                          'relative',
                          'after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-main'
                        )}
                      />
                    </RadioGroup.Item>
                    <Label.Root
                      className={twMerge('font-medium', 'pl-3')}
                      htmlFor={`sort-${i}`}
                    >
                      {sort.label}
                    </Label.Root>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
          </div>
          <Popover.Close
            className={twMerge(
              'rounded-full',
              'h-[25px] w-[25px]',
              'inline-flex items-center justify-center',
              'absolute top-[5px] right-[5px]',
              'hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-black',
              'outline-none cursor-default'
            )}
            aria-label="Close"
          >
            <XIcon />
          </Popover.Close>
          <Popover.Close>
            <button
              className={twMerge(
                'mt-6 px-6 py-2',
                'bg-main text-white',
                'shadow-black',
                'rounded',
                'active:bg-light-pink active:text-slate-950'
              )}
              onClick={handleSort}
              aria-label="Close"
            >
              Submit
            </button>
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default SortOptions;

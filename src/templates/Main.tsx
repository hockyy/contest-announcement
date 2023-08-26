import Decimal from 'decimal.js';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  const [mini, setMini] = useState('99');
  useEffect(() => {
    setInterval(() => {
      setMini((old) => {
        return new Decimal(Math.max(parseFloat(old) - 0.2, 80)).toFixed(1);
      });
    }, 10000);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col content-center justify-between overflow-hidden text-gray-200 antialiased">
      {props.meta}

      <div className="w-5/6 place-self-center lg:w-2/3">
        <div className="content w-full pb-5 text-xl ">{props.children}</div>
      </div>
      <div className="px-4 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made by{' '}
        <a href="https://instagram.com/__hocky"> Hocky Yudhiono &#127808;</a>.
        Repository setup by{' '}
        <a href="https://creativedesignsguru.com"> CreativeDesignsGuru</a>.
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  );
};

export { Main };

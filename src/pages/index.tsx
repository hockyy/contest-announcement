import 'react-toastify/dist/ReactToastify.css';

import { setCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { BeautifulButton } from '@/components/BeautifulButton';
import { useAuthProvider } from '@/hooks/backendClient';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { axiosErrorCatcher } from '@/utils/utils';

const Index = () => {
  const { getLoginRequest, verifyLogin } = useAuthProvider();
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [loginId, setLoginId] = useState('');
  const loginHandler = () => {
    getLoginRequest(username)
      .then((ret) => {
        toast(`Requesting as ${username}`);
        setCode(ret.data.result.code);
        setLoginId(ret.data.result.id);
      })
      .catch(axiosErrorCatcher);
  };
  const verifyHandler = () => {
    verifyLogin(loginId)
      .then((ret) => {
        toast(`Successfully logged in as ${ret.data.result.handle}`);
        const { token } = ret.data.result;

        // Decode the JWT token to extract the exp claim
        const decodedToken = jwt.decode(token);
        const expirationDate = new Date(decodedToken.exp * 1000);

        setCookie('jwtToken', token, { expires: expirationDate });
      })
      .catch(axiosErrorCatcher);
  };
  useEffect(() => {}, []);
  return (
    <Main meta={<Meta title="DnD - Login Page" description="Hush" />}>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div
        className={
          'flex h-screen w-full flex-col items-center justify-center gap-5'
        }
      >
        <div className={'w-full'}>
          <input
            name={'handle'}
            className={'w-full p-4 text-black'}
            value={username}
            placeholder={'Codeforces Handle'}
            onChange={(event) => setUsername(event.target.value)}
          />
          {code && loginId && (
            <div className={'flex flex-col items-center gap-4 text-center'}>
              <div>
                Set your{' '}
                <Link
                  target="_blank"
                  href={'https://codeforces.com/settings/social'}
                >
                  last name (English) in codeforces
                </Link>{' '}
                to:{' '}
                <span className={'text-2xl font-black underline'}>{code}</span>
              </div>

              <BeautifulButton
                buttonType={'secondary'}
                className={'w-full'}
                onClick={verifyHandler}
                message={'Verify'}
              ></BeautifulButton>
              <hr className={'w-full border-solid border-[1] border-blue-50'} />
            </div>
          )}
        </div>

        <BeautifulButton
          className={'w-full'}
          onClick={loginHandler}
          message={'Login'}
        ></BeautifulButton>
        <Link href={'/bounty'}>Bounty</Link>
        <Link href={'/gacha'}>Gacha</Link>
        <Link href={'/stash'}>Stash</Link>
        <Link href={'/level'}>Level</Link>
      </div>
    </Main>
  );
};

export default Index;

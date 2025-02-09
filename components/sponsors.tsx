import Link from 'next/link';
import { FunctionComponent } from 'react';

const Sponsors: FunctionComponent<{
  showLink: boolean;
  showHonorary: boolean;
}> = function ({ showLink, showHonorary }) {
  return (
    <div className='container'>
      <div className='col-12 text-center pb-4'>
        <h2 className='mb-0 fw-bold'>Sponsors</h2>
        {showLink && (
          <p className='text-gray-700 fs-lg'>
            <Link href='/sponsor-us/' className='link-secondary fs-sm'>
              Become a sponsor
            </Link>
          </p>
        )}
      </div>
      <h4 className='text-muted text-center pt-6 pb-4 fw-bold'>Platinum</h4>
      <div className='row align-items-center justify-content-center'>
        <div className='col col-md-10 text-center'>
          <Link
            href='https://github.blog/2023-04-12-github-accelerator-our-first-cohort-and-whats-next/'
            className='d-inline-block p-4'
            target='_blank'
          >
            <img
              src='/images/sponsors/github.png'
              className='img-fluid m-4'
              alt='GitHub logo'
            />
          </Link>
          <Link
            href='https://www.peakcrypto.com/'
            className='d-inline-block p-4'
            target='_blank'
          >
            <img
              src='/images/sponsors/peakcrypto.png'
              className='img-fluid m-4'
              alt='Peak Crypto logo'
            />
          </Link>
        </div>
      </div>

      {showHonorary && (
        <>
          <h4 className='text-muted text-center pt-6 pb-4 fw-bold'>
            Special thanks
          </h4>
          <div className='row align-items-center justify-content-center'>
            <div className='col text-center'>
              <Link
                href='https://www.pragm.co/en/about/about-pragm'
                className='d-inline-block p-4'
                target='_blank'
              >
                <img
                  src='/images/sponsors/pragm.png'
                  className='img-fluid'
                  alt='Pragm logo'
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sponsors;

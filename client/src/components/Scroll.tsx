import AOS from 'aos';
import React, { FC, useLayoutEffect } from 'react';

import './Scroll.scss';

const Scroll: FC = () => {
  useLayoutEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <main className="Scroll">
      <img src="/logo.png" alt="" data-aos="fade-up" />
      <img src="/logo.png" alt="" data-aos="fade-up" />
      <img src="/logo.png" alt="" data-aos="fade-up" />
      <img src="/logo.png" alt="" data-aos="fade-up" />
      <img src="/logo.png" alt="" data-aos="fade-up" />
      <img src="/logo.png" alt="" data-aos="flip-left" />
      <img src="/logo.png" alt="" data-aos="flip-right" />
      <img src="/logo.png" alt="" data-aos="zoom-in" />
      <img src="/logo.png" alt="" data-aos="zoom-in" />
      <img src="/logo.png" alt="" data-aos="zoom-in" />
      <img src="/logo.png" alt="" data-aos="zoom-in" />
      <img src="/logo.png" alt="" data-aos="zoom-in" />
      <img src="/logo.png" alt="" data-aos="fade-down" />
      <img src="/logo.png" alt="" data-aos="fade-down" />
    </main>
  );
};

export default Scroll;

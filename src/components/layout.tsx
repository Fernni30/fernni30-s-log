import * as React from 'react';
import Header from './header';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen overflow-x-hidden">
    <Header />
    {children}
  </div>
);

export default Layout;

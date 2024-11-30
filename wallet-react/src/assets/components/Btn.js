import React from 'react';
import { Icon } from "@iconify/react";

const PaymentOptions = ({ BtnFun }) => {
  const loadPage = (url) => {
    BtnFun(url);
  };

  return (
    <div className="payment-options bg-white p-2 rounded-lg border w-full flex items-center justify-center space-x-6">
      <div className="flex flex-col items-center">
        <div
          className="option flex items-center justify-center p-3 bg-gray-100 rounded-full border hover:bg-gray-200 transition duration-200 cursor-pointer"
          onClick={() => loadPage('upi')}
        >
          <Icon icon="material-symbols:upi-pay-rounded" style={{ color: 'purple', fontSize: '2rem' }} />
        </div>
        <p className="text-sm mt-1">UPI</p>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="option flex items-center justify-center p-3 bg-gray-100 rounded-full border hover:bg-gray-200 transition duration-200 cursor-pointer"
          onClick={() => loadPage('bank')}
        >
          <Icon icon="noto:bank" style={{ fontSize: '2rem' }} />
        </div>
        <p className="text-sm mt-1">Bank</p>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="option flex items-center justify-center p-3 bg-gray-100 rounded-full border hover:bg-gray-200 transition duration-200 cursor-pointer"
          onClick={() => loadPage('profile')}
        >
          <Icon icon="iconamoon:profile-thin" style={{ fontSize: '2rem' }} />
        </div>
        <p className="text-sm mt-1">Profile</p>
      </div>
      <div className="flex flex-col items-center">
        <div
          className="option flex items-center justify-center p-3 bg-gray-100 rounded-full border hover:bg-gray-200 transition duration-200 cursor-pointer"
          onClick={() => loadPage('notify')}
        >
          <Icon icon="noto-v1:bell" style={{ fontSize: '2rem' }} />
        </div>
        <p className="text-sm mt-1">Notify</p>
      </div>
    </div>
  );
};

export default PaymentOptions;
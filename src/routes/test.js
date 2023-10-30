import React from 'react';

import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const TradingView = () => {

return (

<TradingViewWidget

symbol="NASDAQ:AAPL"

theme={Themes.DARK}

locale="en"

autosize

/>

);

};
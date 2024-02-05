// import "./App.css";

function App() {
  return (
    <>
      {/* <BrowserRouter>
      <UserContextProvider>
        <Navbar
          classDisplay={classDisplay}
          setClassDislay={setClassDisplay}
          displayVal={displayVal}
          setDisplayVal={setDisplayVal}
          setLoginState={setLoginState}
          loginState={loginState}
        />

        <div style={intDivStyle}>
          <Routes>
            <Route
              path="/"
              element={<Homepage nonceVal={nonce} loginState={loginState} />}
            />
            <Route path="/support" element={<Support />} />
            <Route path="/maps" element={<Map nonceVal={nonce} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/registration" element={<Registeration />} />
            <Route path="/googleRegistration" element={<GRegistration />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/driverHomePage" element={<DriverHomePage />} />
            <Route path="/moredetails" element={<MoreDetails />} />
            <Route path="/drivermoredetails" element={<DriverDetails />} />
            <Route path="/userbookeddetails" element={<UserBooked />} />
            <Route
              path="/driverpackage"
              element={
                <DriverPackage nonceVal={nonce} loginState={loginState} />
              }
            />
            <Route
              path="/routeDriverLocation"
              element={
                <DriverRouteLocation nonceVal={nonce} loginState={loginState} />
              }
            />
            <Route
              path="/userHomePage"
              element={
                <UserHomePage nonceVal={nonce} loginState={loginState} />
              }
            />
            <Route
              path="/routeDriverRegistration"
              element={<RouteRegisteration />}
            />
            <Route
              path="/routeUserRegistration"
              element={<RouteUserRegisteration />}
            />
            <Route path="/matchedRoutes" element={<MatchedRoutes />} />
            <Route path="/userPackages" element={<UserPackages />} />
            <Route path="/userCheckout" element={<Checkout />} />

            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
          <Footer />
          {windowSize <= 600 && <>{valshow && <StatusBar />}</>}
        </div>
      </UserContextProvider>
    </BrowserRouter> */}
    </>
  );
}

export default App;

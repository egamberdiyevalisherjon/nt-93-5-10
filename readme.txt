create martket  POST /api/v1/markets { phone, password, confirmedPassword }

get me GET /api/v1/markets/me PRIVATE

PRIVATE => token header["x-auth-token"] = Bearer ${token}

complete market POST /api/v1/markets/me PRIVATE { name, inCharge, address: { city, region, full } }

login market POST /api/v1/auth/market { phone, password }

get cities GET /api/v1/cities

get regions /api/v1/regions

update market PUT /api/v1/markets/me PRIVATE { name?, phone?,  inCharge?, address: { city?, region?, full? } }

market password change PUT /api/v1/markets/password PRIVATE { currentPassword, newPassword, confirmedPassword }

baseURL = "http://localhost:5500"
import 'package:flutter/material.dart';
import 'package:jwt_decode/jwt_decode.dart';

class Auth extends ChangeNotifier {
  String _accessToken = "";
  String _refreshToken = "";

  Map<String, dynamic> _auth = {};

  void setAccessToken(String accessToken) {
    _accessToken = accessToken;
  }

  void setRefreshToken(String refreshToken) {
    _refreshToken = refreshToken;
  }

  String getAccessToken() {
    return _accessToken;
  }

  String getRefreshToken() {
    return _refreshToken;
  }

  void setAuthFromAccessToken() {
    if (_accessToken == "") return;
    if (Jwt.isExpired(_accessToken)) return;
    Map<String, dynamic> payload = Jwt.parseJwt(_accessToken);
    _auth["name"] = payload["name"];
    _auth["username"] = payload["username"];
    _auth["profilePhotoURL"] = payload["profilePhotoURL"];
    _auth["isAuth"] = true;
  }

  void clearAuth() {
    _auth = {};
  }

  bool isAuth() {
    if (_auth["isAuth"] != null) return _auth["isAuth"];
    return false;
  }

  Map<String, dynamic> getAuth() {
    return _auth;
  }
}

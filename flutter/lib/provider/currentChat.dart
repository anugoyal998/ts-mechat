import 'package:flutter/material.dart';
import 'package:mechat_flutter/model/user.model.dart';

class CurrentChat extends ChangeNotifier {
  User _user = User();

  void setCurrentChat(User user) {
    _user = user;
  }

  bool isEmpty() {
    return _user.username == "" || _user.username == null;
  }

  void clearCurrentChat() {
    _user = User();
  }

  User getCurrentChat() {
    return _user;
  }
}

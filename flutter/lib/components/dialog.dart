import 'package:flutter/material.dart';
import 'package:mechat_flutter/config/app_routes.dart';

Future<void> showAlertDialog({required context, required title}) async {
  return showDialog<void>(
    context: context,
    barrierDismissible: false, // user must tap button!
    builder: (BuildContext context) {
      return AlertDialog(
        // <-- SEE HERE
        title: Text('$title'),
        // content: SingleChildScrollView(
        //   child: ListBody(
        //     children: const <Widget>[
        //       Text('Are you sure want to cancel booking?'),
        //     ],
        //   ),
        // ),
        actions: <Widget>[
          TextButton(
            child: const Text('Ok'),
            onPressed: () {
              Navigator.of(context).pushNamed(AppRoutes.home);
            },
          ),
        ],
      );
    },
  );
}

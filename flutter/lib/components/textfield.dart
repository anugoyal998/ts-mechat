import 'package:flutter/material.dart';

import 'package:mechat_flutter/styles/app_colors.dart';

class MyTextField extends StatelessWidget {
  final String hintText;
  final Function onChanged;
  final bool obscureText;
  String? Function(String?)? validator;
  final TextEditingController? controller;
  final Widget? prefixIcon;

  MyTextField({
    Key? key,
    required this.hintText,
    required this.onChanged,
    required this.obscureText,
    this.validator,
    this.controller,
    this.prefixIcon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      decoration: InputDecoration(
          hintText: hintText,
          filled: true,
          fillColor: AppColors.darkSecondary,
          border: OutlineInputBorder(),
          prefixIcon: prefixIcon),
      onChanged: (value) => onChanged(value),
      obscureText: obscureText,
      validator: validator,
      controller: controller,
    );
  }
}

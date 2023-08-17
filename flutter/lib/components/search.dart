import 'package:flutter/material.dart';
import 'package:mechat_flutter/components/textfield.dart';

class Search extends StatelessWidget {
  final Function onChanged;

  const Search({super.key, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return MyTextField(
      hintText: 'Search...',
      onChanged: onChanged,
      obscureText: false,
    );
  }
}

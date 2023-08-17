String imageURL(String url) {
  if (url.startsWith("https://ui-avatars.com")) {
    return "${url}&size=64&rounded=true";
  }
  return url;
}

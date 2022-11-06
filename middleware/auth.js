export default ({ store, redirect }) => {
  // 認証されていないユーザーの場合、リダイレクトさせる
  if (!store.state.user.id) {
    return redirect("/login");
  }
}

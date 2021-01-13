function UserInfo(props) {
  return (
    <div>
      <p>Выбран пользователь <b>{props.firstName}</b></p>
      <p>Описание: {props.description}</p>
      <p>Адрес проживания: <b>{props.streetAddress}</b></p>
      <p>Город: <b>{props.city}</b></p>
      <p>Провинция/штат: <b>{props.state}</b></p>
      <p>Индекс: <b>{props.zip}</b></p>
    </div>
  )
}

export default UserInfo;
function createEvent({
  event_class = '',
  event_data = {},
  event_target = '',
  event_type = '',
  event_source = 'WEB', //默认为WEB
  event_sources = '', //默认当前网址,可为空
  event_operator = '',
  event_temporary = '',

  event_system = '', //可为空
  event_system_verison = '', //可为空
  event_terminal = '', //可为空
  event_terminal_verison = '' //可为空
}) {
  if (!window.DBI) {
    console.error('DBI对象不存在')
    return
  }
  let ev = DBI.createEvent({
    event_class,
    // event_data: [],
    event_data,
    event_target,
    event_type,
    event_source, //默认为WEB
    event_sources, //默认当前网址,可为空
    event_operator,
    event_temporary,
    event_system, //可为空
    event_system_verison, //可为空
    event_terminal, //可为空
    event_terminal_verison, //可为空
  })

  return ev
}


export function declare(eventOpts, data={} , cb=()=>{}) {
  if (!window.DBI) {
    return
  }
  let ev = createEvent(eventOpts)
  let type = Object.prototype.toString.call(data)
  // console.log(type === "[object Object]")
  // console.log(Object.prototype.toString.call(data))
  if(type === "[object Object]"){
    ev.addData(data)
  }else if(type === "[object Array]") {
    data.forEach(item => {
      ev.addData(item)
    })
  }
  DBI.declare(ev, cb)
}

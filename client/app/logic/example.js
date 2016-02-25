// Logic (functioanl)
function main(source){
  const click$ = source.DOM;
  const sink = {
    DOM : click$.startsWith(null).flatMap(() =>
      Rx.Observable.timer(0,1000).map(i => `elapsed time ${i}`)
    ),
    Log: Rx.Observable.timer(0,1000).map(i => 2*i)
  }
}

// Effects (imperative)
function DOMDriver(text$){
  text$.subscribe(text => {
    const container = document.querySelector('#app');
    container.textContent = text;
  });
  const DOMSource = Rx.Observable.fromEvent(document,'click');
  return DOMSource;
}

function consoleLogEffect(msg$){
  msg$.subscribe(text => console.log(text));
}

function run(mainFn,drivers){
  const proxySources = {};
  Object.keys(drivers).forEach(key => {
    proxySources[key] = new Subject();
  });
  const sinks = mainFn(proxySources);
  Object.keys(drivers).forEach((key) => {
    const source = drivers[key](sinks[key]);
    source.subscribe(x => proxySources[key].onNext(x));
  });
}

const drivers = {
  DOM: DOMDriver,
  Log: consoleLogEffect
}

run(main,drivers);

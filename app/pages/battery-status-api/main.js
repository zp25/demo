/**
 * 处理电池信息
 * @param {Object} battery BatteryManager实例
 */
function handleBattery(battery) {
  const charging = document.querySelector('li:nth-child(1)');
  const level = document.querySelector('li:nth-child(2)');
  const time = document.querySelector('li:nth-child(3)');
  const distime = document.querySelector('li:nth-child(4)');

  // init
  charging.innerHTML = `Battery charging? ${battery.charging ? 'Yes' : 'No'}`;
  level.innerHTML = `Battery level: ${`${battery.level * 100}%`}`;
  time.innerHTML = `Battery charging time: ${battery.chargingTime} seconds`;
  distime.innerHTML = `Battery discharging time: ${battery.dischargingTime} seconds`;

  battery.addEventListener('chargingchange', () => {
    charging.innerHTML = `Battery charging? ${battery.charging ? 'Yes' : 'No'}`;
  });

  battery.addEventListener('levelchange', () => {
    level.innerHTML = `Battery level: ${battery.level} * 100 + '%'`;
  });

  battery.addEventListener('chargingtimechange', () => {
    time.innerHTML = `Battery charging time: ${battery.chargingTime} seconds`;
  });

  battery.addEventListener('dischargingtimechange', () => {
    distime.innerHTML = `Battery discharging time:
 ${battery.dischargingTime} seconds`;
  });
}

/** DOMContentLoaded Event */
document.addEventListener('DOMContentLoaded', () => {
  navigator.getBattery().then(handleBattery);
}, false);

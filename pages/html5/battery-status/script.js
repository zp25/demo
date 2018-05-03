/**
 * 处理电池信息
 * @param {Object} battery - BatteryManager实例
 */
function handleBattery(battery) {
  const charging = document.querySelector('.charging');
  const level = document.querySelector('.level');
  const time = document.querySelector('.time');
  const distime = document.querySelector('.distime');

  // init
  charging.innerHTML = battery.charging ? 'Yes' : 'No';
  level.innerHTML = `${battery.level * 100}%`;
  time.innerHTML = `${battery.chargingTime} seconds`;
  distime.innerHTML = `${battery.dischargingTime} seconds`;

  battery.addEventListener('chargingchange', () => {
    charging.innerHTML = battery.charging ? 'Yes' : 'No';
  });

  battery.addEventListener('levelchange', () => {
    level.innerHTML = `${battery.level * 100}%`;
  });

  battery.addEventListener('chargingtimechange', () => {
    time.innerHTML = `${battery.chargingTime} seconds`;
  });

  battery.addEventListener('dischargingtimechange', () => {
    distime.innerHTML = `${battery.dischargingTime} seconds`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  navigator.getBattery().then(handleBattery);
}, false);

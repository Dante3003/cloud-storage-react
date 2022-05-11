function AppIcons({ icon, size, ...props }) {
  const Icons = require(`@heroicons/react/solid`);
  const Icon = Icons[icon];
  return <Icon style={{ width: size || 22 }} {...props} />;
}

export default AppIcons;

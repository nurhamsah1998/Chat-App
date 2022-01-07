function Button({ title, o, brd, wdh }) {
  return (
    <button
      onClick={o}
      style={{
        borderColor: brd,
        width: wdh,
        padding: '5px',
        cursor: 'pointer',
      }}
    >
      {title}
    </button>
  );
}

export default Button;

Button.defaultProps = {
  title: 'button',
  brd: 'transparent',
  wdh: '100%',
};

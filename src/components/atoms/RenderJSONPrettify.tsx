const RenderJSONPrettify = ({ value }: { value: any }) => {
  return (
    <pre
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value, null, 6).replace(
          /\n( *)/g,
          function (_match, p1) {
            return "<br>" + "&nbsp;".repeat(p1.length);
          }
        ),
      }}
    />
  );
};

export default RenderJSONPrettify;

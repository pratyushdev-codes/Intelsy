import React, { useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css'; // Add CSS mode
import 'codemirror/mode/xml/xml'; // Add HTML/XML mode
import 'codemirror/mode/clike/clike'; // Add C, C++, Java, C#, etc. mode
import 'codemirror/mode/python/python'; // Add Python mode
import 'codemirror/mode/rust/rust'; // Add Rust mode
import 'codemirror/mode/ruby/ruby'; // Add Ruby mode
import 'codemirror/mode/dart/dart'; // Add Dart mode
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

const Editor = () => {
  useEffect(() => { 
    async function init() {
      CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: 'javascript',
        lineNumbers: true,
        theme: '3024-night',
        autoCloseTags: true,
        autoCloseBrackets: true,
      });
    }
    init();
  }, []);

  return (
    <textarea id="realtimeEditor">
      {/* Initial content for the editor */}
    </textarea>
  );
};

export default Editor;

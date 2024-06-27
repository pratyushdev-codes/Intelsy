import React, { useEffect, useRef, useState } from 'react';
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
import ACTIONS from '../Action';
import AccessibilityBar from './AccessibilityBar';

const Editor = ({ socketRef, roomId }) => {
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    console.log(code);
  }, [code]);

  useEffect(() => {
    const init = () => {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: 'javascript',
          lineNumbers: true,
          theme: '3024-night',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineWrapping: true, // Enable line wrapping
          viewportMargin: Infinity, // Ensure editor adapts to content height
          extraKeys: { 'Ctrl-Space': 'autocomplete' }, // Example: Enable autocomplete
        }
      );

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const newCode = instance.getValue();
        setCode(newCode); // Update the state with the new code
        if (origin !== 'setValue' && socketRef.current) { // Ensure socketRef.current is not null
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code: newCode,
          });
        }
      });
    };
    init();
    // Clean up event listener
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Cleanup CodeMirror instance
      }
    };
  }, [roomId, socketRef]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null && editorRef.current) {
          editorRef.current.setValue(code);
        }
      });
    }
  
    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;

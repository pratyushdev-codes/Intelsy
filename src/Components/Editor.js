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
import 'codemirror/theme/tomorrow-night-bright.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '../Action';
import AccessibilityBar from './AccessibilityBar';

// Autocomplete Addons --> codemirror
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/sql-hint';

const Editor = ({ socketRef, roomId, setCode , onCodeChange}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = () => {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: {name:'javascript',json:true},
          lineNumbers: true,
          theme: 'tomorrow-night-bright',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineWrapping: true, // Enable line wrapping
          viewportMargin: Infinity, // Ensure editor adapts to content height
          extraKeys: { 'Ctrl-Space': 'autocomplete' }
        }
      );

      // Set prewritten comment as the initial value
      editorRef.current.setValue(
        `// Intelsy Compiler Support: Java, C++, Python.
// Discover more features in the Accessibility Bar.
// Enhance your coding experience with Intelsy AI Chatbot, AI Assist, and Explain.


public class Main {
      public static void main(String[] Args) {
              // Start coding here 
      }
}`
      );
      

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const newCode = instance.getValue();
        setCode(newCode); // Update the state in EditorPage component
        onCodeChange(newCode);
        if (origin !== 'setValue' && socketRef.current) {
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
  }, [roomId, socketRef, setCode]);

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

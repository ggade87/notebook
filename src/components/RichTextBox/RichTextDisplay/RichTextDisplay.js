import React, { Component } from "react";
import { stateToHTML } from "draft-js-export-html";
import {CompositeDecorator,convertFromRaw,convertToRaw,convertFromHTML, Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import "../RichTextBox.css";
const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="nofollow noreferrer" href={url} target="_blank">
      {props.children}
    </a>
  );
};

    const convertToEditorState = (editorContent) => {
      const content = convertFromRaw(JSON.parse(editorContent));
      const editorState = EditorState.createWithContent(content, decorator);
      return editorState;
    };
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
class RichTextDisplay extends Component {
    constructor(props) {
        super(props);
        const findLinkEntities = (contentBlock, callback, contentState) =>  {
          contentBlock.findEntityRanges(
            (character) => {
              const entityKey = character.getEntity();
              return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
              );
            },
            callback
          );
        }
   
        
        this.state = {
          editorState:  this.props.editorStateProp ?   convertToEditorState(this.props.editorStateProp) :  EditorState.createEmpty(decorator)  ,
          editorContentHtml: "", 
          showURLInput: false,
          urlValue: '',
        };
        this.focus = () => false 
        this.onChange = (editorState) => {  
          return false;
        };
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    
        //Link code
        this.promptForLink = this._promptForLink.bind(this);
        this.onURLChange = (e) => this.setState({urlValue: e.target.value});
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);
      }
      
      //This function set state when edit called.
      getState = (val) => {
        
        const blocksFromHTML = convertFromHTML(val);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        );
         const editorState =EditorState.createWithContent(state);
        return val;
        //return EditorState.createWithContent(ContentState.createFromText(val));
      }
    
      _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return true;
        }
        return false;
      }
    
      _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
          const newEditorState = RichUtils.onTab(
            e,
            this.state.editorState,
            4 /* maxDepth */
          );
          if (newEditorState !== this.state.editorState) {
            this.onChange(newEditorState);
          }
          return;
        }
        return getDefaultKeyBinding(e);
      }
    
      _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
      }
    
      _toggleInlineStyle(inlineStyle) {
        this.onChange(
          RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
      }
      //Link code start
      _promptForLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          const contentState = editorState.getCurrentContent();
          const startKey = editorState.getSelection().getStartKey();
          const startOffset = editorState.getSelection().getStartOffset();
          const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
          const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    
          let url = '';
          if (linkKey) {
            const linkInstance = contentState.getEntity(linkKey);
            url = linkInstance.getData().url;
          }
    
          this.setState({
            showURLInput: true,
            urlValue: url,
          }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
          });
        }
      }
    
      _confirmLink(e) {
        e.preventDefault();
        const {editorState, urlValue} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'LINK',
          'MUTABLE',  
          {url: urlValue, target: '_blank',}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        console.log(editorState)
        this.setState({
          editorState: RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
          ),
          showURLInput: false,
          urlValue: '',
        }, () => {
          setTimeout(() => this.refs.editor.focus(), 0);
        });
      }
    
      _onLinkInputKeyDown(e) {
        if (e.which === 13) {
          this._confirmLink(e);
        }
      }
    
      _removeLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          this.setState({
            editorState: RichUtils.toggleLink(editorState, selection, null),
          });
        }
      }

    //   componentWillReceiveProps(nextProps){
    //     if(this.props.editorStateProp === nextProps.editorStateProp){
    //        this.setState({
    //         editorState:  convertToEditorState(this.props.editorStateProp)
    //        })
    //     }
    //  }
      //Link code end
      render() {
        const { editorState } = this.state;
    
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = "RichEditor-editor";
        console.log(editorState)
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
          if (contentState.getBlockMap().first().getType() !== "unstyled") {
            className += " RichEditor-hidePlaceholder";
          }
        }
    
        //Link code start
        let urlInput;
        if (this.state.showURLInput) {
          urlInput =
            <div style={styles.urlInputContainer}>
              <input
                onChange={this.onURLChange}
                ref="url"
                style={styles.urlInput}
                type="text"
                value={this.state.urlValue}
                onKeyDown={this.onLinkInputKeyDown}
              />
              <button onMouseDown={this.confirmLink}>
                Confirm
              </button>
            </div>;
        }
    
        //Link code End
    
        return (
            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                onChange={this.onChange}
                ref="editor"
                readOnly
              />
            </div>
        );
      }
    }
    
    // Custom overrides for "code" style.
    export const styleMap = {
      CODE: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
    };
    
    export function getBlockStyle(block) {
      switch (block.getType()) {
        case "blockquote":
          return "RichEditor-blockquote";
        default:
          return null;
      }
    }
     
     
    //Link code
    function findLinkEntities(contentBlock, callback, contentState) {
      contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
          );
        },
        callback
      );
    }
    
     
    
    const styles = {
      root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
      },
      buttons: {
        marginBottom: 10,
      },
      urlInputContainer: {
        marginBottom: 10,
      },
      urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
      },
      editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
      },
      button: {
        marginTop: 10,
        textAlign: 'center',
      },
      link: {
        color: '#3b5998',
        textDecoration: 'underline',
      },
    };
 
export default RichTextDisplay;
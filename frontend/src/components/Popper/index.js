import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return document;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
class Portal extends React.Component {
  componentDidMount() {
    this.setMountNode(this.props.container);

    // Only rerender if needed
    if (!this.props.disablePortal) {
      this.forceUpdate(this.props.onRendered);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.container !== this.props.container ||
      prevProps.disablePortal !== this.props.disablePortal
    ) {
      this.setMountNode(this.props.container);

      // Only rerender if needed
      if (!this.props.disablePortal) {
        this.forceUpdate(this.props.onRendered);
      }
    }
  }

  componentWillUnmount() {
    this.mountNode = null;
  }

  setMountNode(container) {
    if (this.props.disablePortal) {
      this.mountNode = ReactDOM.findDOMNode(this).parentElement;
      return;
    }

    this.mountNode = getContainer(container, getOwnerDocument(this).body);
  }

  /**
   * @public
   */
  getMountNode = () => {
    return this.mountNode;
  };

  render() {
    const { children, disablePortal } = this.props;

    if (disablePortal) {
      return children;
    }

    return this.mountNode
      ? ReactDOM.createPortal(children, this.mountNode)
      : null;
  }
}

Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node.isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: PropTypes.func,
};

Portal.defaultProps = {
  disablePortal: false,
};

function flipPlacement(placement) {
  const direction =
    (typeof window !== 'undefined' && document.body.getAttribute('dir')) ||
    'ltr';

  if (direction !== 'rtl') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
class BngPopper extends React.Component {
  constructor(props) {
    super();
    this.state = {
      exited: !props.open,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.open !== this.props.open &&
      !this.props.open &&
      !this.props.transition
    ) {
      // Otherwise handleExited will call this.
      this.handleClose();
    }

    // Let's update the popper position.
    if (
      prevProps.open !== this.props.open ||
      prevProps.anchorEl !== this.props.anchorEl ||
      prevProps.popperOptions !== this.props.popperOptions ||
      prevProps.modifiers !== this.props.modifiers ||
      prevProps.disablePortal !== this.props.disablePortal ||
      prevProps.placement !== this.props.placement
    ) {
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.open) {
      return {
        exited: false,
      };
    }

    if (!nextProps.transition) {
      // Otherwise let handleExited take care of marking exited.
      return {
        exited: true,
      };
    }

    return null;
  }

  handleOpen = () => {
    const {
      anchorEl,
      modifiers,
      open,
      placement,
      popperOptions = {},
      disablePortal,
    } = this.props;
    const popperNode = ReactDOM.findDOMNode(this);

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    this.popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
      placement: flipPlacement(placement),
      ...popperOptions,
      modifiers: {
        ...(disablePortal
          ? {}
          : {
              // It's using scrollParent by default, we can use the viewport when using a portal.
              preventOverflow: {
                boundariesElement: 'window',
              },
            }),
        ...modifiers,
        ...popperOptions.modifiers,
      },
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: this.handlePopperUpdate,
      onUpdate: this.handlePopperUpdate,
    });
  };

  handlePopperUpdate = (data) => {
    if (data.placement !== this.state.placement) {
      this.setState({
        placement: data.placement,
      });
    }
  };

  handleExited = () => {
    this.setState({ exited: true });
    this.handleClose();
  };

  handleClose = () => {
    if (!this.popper) {
      return;
    }

    this.popper.destroy();
    this.popper = null;
  };

  render() {
    const {
      anchorEl,
      children,
      container,
      disablePortal,
      keepMounted,
      modifiers,
      open,
      placement: placementProps,
      popperOptions,
      theme,
      transition,
      ...other
    } = this.props;
    const { exited, placement } = this.state;

    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }

    const childProps = {
      placement: placement || flipPlacement(placementProps),
    };

    if (transition) {
      childProps.TransitionProps = {
        in: open,
        onExited: this.handleExited,
      };
    }

    return (
      <Portal
        onRendered={this.handleOpen}
        disablePortal={disablePortal}
        container={container}
      >
        <div
          role="tooltip"
          style={{
            // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
            position: 'absolute',
          }}
          {...other}
        >
          {typeof children === 'function' ? children(childProps) : children}
        </div>
      </Portal>
    );
  }
}

BngPopper.propTypes = {
  /**
   * This is the DOM element, or a function that returns the DOM element,
   * that may be used to set the position of the popover.
   * The return value will passed as the reference object of the Popper
   * instance.
   */
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Popper render function or node.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
   */
  modifiers: PropTypes.object,
  /**
   * If `true`, the popper is visible.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
   */
  popperOptions: PropTypes.object,
  /**
   * Help supporting a react-transition-group/Transition component.
   */
  transition: PropTypes.bool,
};

BngPopper.defaultProps = {
  disablePortal: false,
  placement: 'bottom',
  transition: false,
};

export default BngPopper;

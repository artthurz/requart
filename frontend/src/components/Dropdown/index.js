import './styles.css';

import React, { useState } from 'react';
import Popper from '../Popper';
import { BngClickOutsideOverlay } from '../ClickOutsideOverlay';
import { BngIconButton } from '../IconButton';
import { MdMoreVert } from 'react-icons/md';
import _ from 'lodash';

export const Dropdown = ({
  className = '',
  popperClassName = '',
  icon = <MdMoreVert />,
  container = document.body,
  closeOnSelect = true,
  options = [],
  onOpen = _.noop,
  onClose = _.noop,
  customButton = null,
  customOptions = null,
  boundariesElements = null,
  popperOpts = {},
  popperFlipBehaviour = 'flip',
  title = '',
}) => {
  const [popperRef, setPopperRef] = useState(null);

  if (!boundariesElements) {
    boundariesElements = container;
  }

  const openDropdown = async (event) => {
    if (!!event && !!event.persist) event.persist();
    const target = event.currentTarget;
    await setPopperRef(target);
    await onOpen(event);
  };

  const closeDropdown = (event) => {
    setPopperRef(null);
    onClose(event);
  };

  return (
    <div className={`BngDropdown ${className}`} title={title}>
      {!customButton && (
        <BngIconButton onClick={openDropdown}>{icon}</BngIconButton>
      )}
      {customButton && customButton({ openDropdown })}

      <Popper
        className={`bng-dropdown-parent ${popperClassName}`}
        container={container}
        open={!_.isEmpty(popperRef)}
        anchorEl={popperRef}
        popperOptions={{
          modifiers: {
            preventOverflow: {
              boundariesElement: boundariesElements,
            },
            flips: {
              behavior: popperFlipBehaviour,
            },
          },
        }}
        {...popperOpts}
      >
        <BngClickOutsideOverlay
          onClick={closeDropdown}
          container={container}
          className={popperClassName ? `${popperClassName}Overlay` : ''}
        />

        {customOptions && customOptions({ closeDropdown })}

        {!customOptions && (
          <ul className="bng-dropdown unstyled">
            {options.map((opt, idx) => {
              if (Array.isArray(opt)) {
                if (opt.length === 1) {
                  opt = opt[0];
                } else {
                  return (
                    <OptionGroup
                      key={idx}
                      group={opt}
                      closeDropdown={closeDropdown}
                      closeOnSelect={closeOnSelect}
                    />
                  );
                }
              }

              return (
                <Option
                  key={opt.key || idx}
                  opt={opt}
                  closeDropdown={closeDropdown}
                  closeOnSelect={closeOnSelect}
                />
              );
            })}
          </ul>
        )}
      </Popper>
    </div>
  );
};

const Option = ({ opt, closeDropdown, closeOnSelect, className = '' }) => {
  if (opt.hasOwnProperty('visible') && !opt.visible) return null;

  return (
    <li
      onClick={(event) => {
        const fn = opt.onClick || _.noop;
        fn(event, { closeDropdown });
        if (closeOnSelect) {
          closeDropdown();
        }
      }}
      className={`${opt.className || ''} ${className}`}
    >
      {opt.hasOwnProperty('render') && opt.render()}
      {!opt.hasOwnProperty('render') && (
        <React.Fragment>
          {opt.icon}
          <span>{opt.label}</span>
        </React.Fragment>
      )}
    </li>
  );
};

const OptionGroup = ({ group, closeDropdown, closeOnSelect }) => {
  return group.map((opt, idx) => {
    const isFirst = idx === 0;
    const isLast = !isFirst && group.length - 1 === idx;
    return (
      <Option
        key={opt.key || idx}
        opt={opt}
        closeDropdown={closeDropdown}
        closeOnSelect={closeOnSelect}
        className={`GroupOption ${isFirst ? 'GroupFirst' : ''} ${
          isLast ? 'GroupLast' : ''
        } ${!isLast ? 'box-shadow-none' : ''}`}
      />
    );
  });
};

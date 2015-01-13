(function(React) {
    window.Components = window.Components || {};
    window.Components.userList = React.createClass({
        displayName: "userList",
        getInitialState: function() { return { selectedUsers: [] }; },

        componentWillMount: function() {
            this.setState({ selectedUsers:  this.props.current });
        },

        componentWillReceiveProps: function(newProps) {
            if (newProps.selected) {
                this.setState({ selectedUsers: newProps.selected });
            }
        },

        componentWillUpdate: function() { console.time("Render UserList"); },
        componentDidUpdate: function() { console.timeEnd("Render UserList"); },

        updateUsers: function(users) {
            /* [binging]  React => Angular */
            this.setState({selectedUsers: users});
            var scope = this.props.scope;
            scope.$apply(function() {
                scope.userOnUpdate({users: users});
            });
        },

        toggleSelected: function(user) {
            var _selectedUsers = this.state.selectedUsers || [];
            if (_.contains(_selectedUsers, user)) {
                var index = _selectedUsers.indexOf(user);
                if (index > -1) {
                    _selectedUsers.splice(index, 1);
                }
            } else {
                _selectedUsers.push(user);
            }
            this.updateUsers(_selectedUsers);
        },

        render: function() {
            var _selectedUsers = this.state.selectedUsers || [];
            var _toggleSelected = this.toggleSelected;

            var userList = _.map(this.props.list, function(user, i) {

                // use React.addons for set multiple classes
                var cx = React.addons.classSet;
                var classes = cx({
                    'odd': i % 2 === 0,
                    'even': i % 2 !== 0,
                    'selected': _.contains(_selectedUsers, user)
                });

                var clickHandler = function() { _toggleSelected(user); };

                return (
                    <li className={classes} onClick={clickHandler}>
                        <span>{ (i+1) + ". "+ user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.phone}</span>
                    </li>
                )
            });

            return (<ul className="user-list">{userList}</ul>);
        }
    });
}(window.React));
